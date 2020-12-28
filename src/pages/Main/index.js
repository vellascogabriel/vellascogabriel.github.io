import React, {Component} from 'react';
import {FaGithub, FaSearch , FaSpinner} from 'react-icons/fa';
import { MdLocationOn} from 'react-icons/md';

import api from '../../services/api';
import filter from '../../services/filter';
import { estados } from './utils';

import Container from '../../Components/Container';
import { Form, SubmitButton, List, SearchHeader, FilterForm, FilterTitle } from './styles';



class Main extends Component {

    state = {
        newProfile: '',
        profiles: [],
        loading: false,
        location:'',
        order:'1',
        bio: false,
    };

    handleInputChange = e =>{
        this.setState({ 
                        newProfile: e.target.value,
        });
    };

    handleLocationChange = e =>{
        e.preventDefault()
        this.setState({
            location:e.target.value,
        })
    }

    handleBioChange = ()=> {
        this.setState({
            bio: true,
        })
    }

    handleOrderChange = e =>{

        e.preventDefault()
        this.setState({
            order: e.target.value,
        })
    }


    handleSubmit = async  e =>{
        e.preventDefault();

        this.setState({ loading: true});

        const { newProfile } = this.state;

        // var leitura = []
        var response =''

        const elementsPerPage = 10
        var page = 1
        var items = []


        if(newProfile){
            response = await api.get(`/search/users?q=${newProfile}&per_page=${elementsPerPage}&page=${page}`)
            items = response.data.items
        }else{
            response = await api.get(`/users`, {
                params: {
                    per_page: elementsPerPage,
                }
            })

            items = response.data.items
        }
            

        var userLogin = await Promise.all(items.map(element =>{
            return {
                login: element.login,
                photo:element.avatar_url
            }
        }))


        const leitura = await Promise.all(userLogin.map( async (elemento) => {

            response = await api.get(`/users/${elemento.login}`,{
                headers:{
                    Accept: 'application/vnd.github.v3+json'
                }
            })
        

            return {
                name: response.data.name,
                login: response.data.login,
                photo: response.data.avatar_url,
                since: new Date(response.data.created_at),
                location: response.data.location,
                bio: response.data.bio,
                url: response.data.html_url
            }

        }))

        this.setState({
            profiles:leitura,
            loading: false,
        })

    }


    handleFilter = async e =>{
        e.preventDefault()

        const { profiles, order, location, bio} = this.state

        console.log(profiles)

        const resultado = filter(order, profiles, location, bio)

        console.log(resultado)

        this.setState({
            profiles: resultado,
            order: order
        })

    }

    
    render(){

        const { newProfile, loading, profiles} = this.state;

    return (

    <>
    <Container>
        
        <SearchHeader>
            <FaGithub size={60}/>
            <h1>Busca de Perfis</h1>
        </SearchHeader>

        <Form onSubmit={this.handleSubmit}>

            <input 
            type="text"  
            placeholder="Buscar Usuário"
            value={newProfile}
            onChange={this.handleInputChange}
            />
            

            <SubmitButton loading={loading}>

                {loading ? 
                <FaSpinner color="#FFF" size={14 }/> : <FaSearch color = "#fff" size={14} />}
                
            </SubmitButton>
            
            
        </Form>

        <FilterTitle>
            <h1>Filtros</h1>
        </FilterTitle>

        <FilterForm  onSubmit={this.handleFilter}>


            <div className="location-order">
                <select id="location" placeholder="Local" name="location" onChange={this.handleLocationChange}>
                    <option value="">Local</option>
                    {
                        estados.map(elementos => {
                            return <option value={elementos}>{elementos}</option>
                        })
                    }   

                </select>

                <select id="order" name="order" onChange={this.handleOrderChange}>

                    <option value=''>Escolha uma ordenação</option>
                    <option value="1">Usuarios mais novos</option>
                    <option value="2">Usuarios mais antigos</option>

                </select>
            </div>
            <div className="bio">
                <div>
                    <h2> Perfis com Bio? </h2>
                    <input type="checkbox" onChange={this.handleBioChange} />
                </div>
                <SubmitButton>Filtrar</SubmitButton>
                
            </div>
            

            

        </FilterForm>


        <List>
            {
                profiles.map(profile => (
                    
                    <a href={profile.url}>
                    <li key={profile.login}>
                       
                        <img src={profile.photo} alt={profile.photo}/>
                        <div>
                            <span className="text-name">{profile.name}</span>
                            <span>{profile.login}</span>

                            <span className="text-location">
                                { profile.location ? <MdLocationOn size={20}/> :''}
                                {profile.location}
                            </span>
                            <span className="text-bio">{profile.bio}</span>
                            <span>desde {`${profile.since.getDate()}/${profile.since.getMonth()+1}/${profile.since.getFullYear()}`}</span>
                        </div>
                        
                    </li>
                    </a>
                ))

                
            }
        </List>   

    </Container>

    </>
    );
}
}

export default Main;