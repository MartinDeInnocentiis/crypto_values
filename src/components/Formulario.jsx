import {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'


const InputSubmit = styled.input`
    background-color:#9497FF;
    border:none;
    width:100%;
    padding:10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size:20px;
    border-radius:5px;
    transition: background-color .3s ease;
    margin-top:20px;
    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulario = () => {
    const [cryptos, setCryptos] = useState([])

    const [moneda, SelectMonedas] = useSelectMonedas('Elige tu Moneda', monedas)

    const [criptomoneda, SelectCriptomonedas] = useSelectMonedas('Elige tu Criptomoneda', cryptos)


    useEffect(() => {
        const consultarAPI= async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=25&tsym=USD"
            const response = await fetch (url)
            const result = await response.json()
            
            const arrayCrypto=result.Data.map(crypto => {
                const object={
                    id:crypto.CoinInfo.Name,
                    name:crypto.CoinInfo.FullName
                }
                return object
            })

            setCryptos(arrayCrypto)
        }
        consultarAPI()
    }, [])

    return (
        <form>

            <SelectMonedas />
            <SelectCriptomonedas />

            <InputSubmit
                type='submit'
                value="Cotizar"
            />
        </form>
    )
}

export default Formulario
