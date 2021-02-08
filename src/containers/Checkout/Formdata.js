import React , { useState } from 'react';
import Input from '../../components/UI/Form/Input/Input';
import Buttons from '../../components/UI/Buttons/Buttons';
import Axios from '../../axios.orders';

const Formdata = (props) => {
    const [formdata, setFormdata] = useState({
        form : {
            name: {
                inputtype: "input",
                config: {
                    type: "text",
                    placeholder: "Enter Your Name",
                    title: "Your Name"
                },
                value:"test",
                validation: {
                    required: true
                },
                label: "Your Name",
                error: false
            },
            email: {
                inputtype: "input",
                config: {
                    type: "email",
                    placeholder: "Enter Your Email",
                    title: "Email"
                },
                value:"",
                label: "Your Email",
                validation: {
                    required: true,
                    regex: /\S+@\S+\.\S+/
                },
                error: false
                
            },
            password: {
                inputtype: "input",
                config: {
                    type: "password",
                    placeholder: "Enter Your Password",
                    title: "Password"
                },
                value:"",
                label: "Your Password",
                validation: {
                    required: true,
                    minLength: 8,
                    maxLength: 8
                },
                error: false
            },
            select: {
                inputtype: "select",
                config: {
                    placeholder: "Select type",
                    title: "Type",
                    options: [{
                        value: "1",
                        display: "One"
                    }, {
                        value: 2,
                        display: "Two"
                    }]
                },   
                label: "Type",         
                value: "",
                validation :{},
                error: false
            }        
        }
    });

    const formHandler = (e) => {
        e.preventDefault();

        console.log(props.ingredients);
        let isValid = true;
        let forminput = {};
        let formstate = {...formdata.form}

        for(let input in formstate){
            forminput[input] = formstate[input].value;
            
            if(!validate(formstate[input].value.trim(), formstate[input].validation)){
                formstate[input].error = "enter correct "+input;
            }else{
                formstate[input].error = false;
            }
            
            isValid = validate(formstate[input].value, formstate[input].validation) && isValid;
        }
        
        if(isValid){
            forminput["ingredient"] = {...props.ingredients};
            let order_id = window.localStorage.getItem("burger_order_id");

            Axios.patch(`orders/${order_id}.json`, forminput)
            .then( res => {
                window.localStorage.removeItem("burger_order_id");
                props.history.push("/orders")
            })
            .catch(err => {

            })
        }else{
            setFormdata({form: formstate});
        }
    }

    const validate = (value, rules) => {
        let isValid = true;

        if(rules.required ){
            isValid = value !== "" && isValid;
        }

        if(rules.regex){
            isValid = rules.regex.test(value) && isValid;
        }

        if(rules.minLength){
            console.log(value)
            isValid = rules.minLength <= value.length && isValid;
        }

        if(rules.maxLength){
            console.log(value)
            isValid = rules.maxLength >= value.length && isValid;
        }

        return isValid;
    }

    const inputHandler = (e, elem) => {
        const updatedData = {...formdata};
        
        updatedData.form[elem].value = e.target.value;
        console.log(validate(e.target.value.trim(), formdata.form[elem]));

        if(!validate(e.target.value.trim(), formdata.form[elem].validation)){
            updatedData.form[elem].error = "enter correct "+elem;
        }else{
            updatedData.form[elem].error = false;
        }

        setFormdata(updatedData);
    }

    const getFormArray = () =>{
        let formArrray =[];

        for(let key in formdata.form){
            formArrray.push({
                ...formdata.form[key],
                id: key
            });
        }

        return formArrray;
    }

    return ( 
        <form onSubmit={formHandler}>
            {getFormArray().map(input => <Input 
                key={input.id} 
                inputtype={input.inputtype} 
                config={input.config} 
                changed={(e) => inputHandler(e, input.id)}
                label={input.label}
                error={input.error}/>
            )}
            <Buttons btnClass="Error" Type="reset">Reset</Buttons>
            <Buttons btnClass="Success" Type="submit">Place Order</Buttons>
        </form>
     );
}
 
export default Formdata;