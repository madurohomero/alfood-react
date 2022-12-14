import { Box, Button, TextField, Typography, AppBar, Container, Toolbar, Link, Paper } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../../http"

const FormRestaurante = () => {
    const parametros = useParams()
    useEffect(() => {
        if (parametros.id) {
            http.get(`restaurantes/${parametros.id}/`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [parametros])
    const [nomeRestaurante, setNomeRestaurante] = useState('')
    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('Restaurante atualizado com sucesso!')
                })

        } else {
            http.post('restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('Restaurante cadastrado com sucesso!')
                })
        }

    }
    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6">
                            Administração
                        </Typography>
                        <Box sx={{ display: 'flex', flexGrow: 1 }}>
                            <Link>
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Restaurantes
                                </Button>
                            </Link>
                            <Link>
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Novo Restaurantes
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", FlexGrow: 1 }}>
                            <Box component="form" sx={{width: '100%'}} onSubmit={aoSubmeterForm}>
                                <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
                                <TextField value={nomeRestaurante}
                                    onChange={evento => setNomeRestaurante(evento.target.value)}
                                    label="Nome do Restaurante"
                                    variant="standard"
                                    fullWidth
                                    required
                                />
                                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>

        </>

    )
}

export default FormRestaurante