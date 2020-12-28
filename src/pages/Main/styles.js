import styled, { keyframes, css } from 'styled-components';


export const Form = styled.form`
    
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    width:100%;

    input {
        flex: 1;
        border: 1px solid #eee;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 16px;
        width:100%;
    }

`;


const rotate = keyframes`

    from{
        transform: rotate(0deg);
    }

    to{
        transform: rotate(360deg);
    }
`;

export const SubmitButton = styled.button.attrs( props => ({
    type: 'submit',
    disabled: props.loading,
}))`
    background: rgb(0,0,0);
    border: 0;
    padding: 0 15px;
    height:40px;
    margin-left: 10px;
    border-radius: 4px;
    color: #fff;

    display: flex;
    justify-content: center;
    align-items:center;


    &[disabled]{
      cursor: not-allowed;
      opacity: 0.7;  
    }


    ${ props => props.loading && css`
        svg {
            animation: ${rotate} 2s linear infinite;
        }
    `}
`;

export const List = styled.ul`

    list-style:none;

    display: grid;
    grid-template-columns: 1fr 1fr;

    a{
        text-decoration:none;
    }

    li{
        margin:20px;
        color: #fff;
        background-color: black;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
        border-radius: 4px;

        height: 500px;
        width:300px;

        img{
            max-height:150px;
            border-radius:50%;
            box-shadow: 0 0 0.4em whitesmoke;
        }

        div{
            display: flex;
            flex-direction:column;
            align-items: center;
            justify-content:center;
            margin-top: 20px;
            font-size:16px;

            span{
                line-height: 1.5;
            }
        }

        .text-name{
            font-size: 20px;
            margin: 5px 5px;
            font-weight:bold;
        }

        .text-bio{
            text-align: center;
            line-height:1.3;
            width:70%;
            margin:10px;
        }

        .text-location{
            display:flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin:5px;
        }

        a{
            color:black;
            text-decoration:none;
            margin-top:10px;
        }
    }

`;


export const SearchHeader = styled.header`
    display:flex;
    flex-direction: row;
    align-items:center;
    justify-content:center;
`;


export const FilterForm = styled.form`

    margin-top: 30px;
    display: flex;
    flex-direction: column;
    width:100%;

    select {
        flex:1;
        border: 1px solid #eee;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 16px;
        width: 50%
    }

    .bio{
        display:flex;
        flex-direction: row;
        align-items:center;
        justify-content:center;
        
    }

    .bio div, button {
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:center;
        margin: 5px;
        font-size:12px;
        width:50%;
    }

    .bio h2, input{
        margin-left:5px;
    } 

`;

export const FilterTitle = styled.div`

    display:flex;
    flex-direction: row;
    align-items:center;
    justify-content:center;
    margin-top:40px;
`;