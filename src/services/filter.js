

const filter = function( order, profiles, location, bio){
        var orderList = []


        // Ordenação por data de criação do Perfil no GitHub
        function compare(elemento1, elemento2){

            const since1 = elemento1.since;
            const since2 = elemento2.since;
            let result = 0;

            if(order ==="2"){

                if(since1>since2){
                    result = 1
                }else{
                    result=-1
                }

            }else{
                if(since1<since2){
                    result = 1
                }else{
                    result=-1
                }
            }

            return result
        }

        orderList = profiles.sort(compare)


        // Filtragem por localidade
        var total = [] 
        if(location){   
            orderList.map(elemento => {
                if(elemento.location){

                    if((elemento.location).includes(location)){
                        
                        return total.push(elemento)
                    }
               }
            })
        }else{
            total = orderList
        }


        // Filtrar somente os perfis que possuem bio 
        var filtered = []
        if(bio){
            
            total.map(elemento =>{
                if(elemento.bio){
                    return filtered.push(elemento)
                }
            })
        }else{
            filtered = total
        }

        return filtered
}

export default filter;