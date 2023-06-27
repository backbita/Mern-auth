import { useState, useEffect } from "react"
import {Form, Row, Col, Button} from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import FormContainer from "../components/FormContainer"
import { setCredentials } from "../slices/authSlice"
import { useRegisterMutation } from "../slices/usersApiSlice"
import { toast } from "react-toastify"
import Loader from '../components/Loader'



const RigesterScreen = () => {
    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[password2, setPassword2] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [ register, {isLoading}]= useRegisterMutation()

    const { userInfo } = useSelector(state => state.auth)

    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    },[navigate, userInfo])

    const submitHandler= async(e) =>{
        e.preventDefault()
        if(password !== password2){
            toast.error('passwords do not match')
        } else {
            try {
                const response = await register({name, email, password})
                dispatch(setCredentials({...response}))
                navigate('/')
            } catch (err) {
                toast.error(err.data.message|| err.error)
            }
        }
    }

  return (
    <FormContainer>
        <h1>Rigester Now</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className="my-1" controlId='name'>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                type='text'
                placeholder="Enter Your Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
                ></Form.Control>
            </Form.Group>
            <Form.Group className="my-1" controlId='email'>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                type='email'
                placeholder="Enter Your Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                ></Form.Control>
            </Form.Group>
            <Form.Group className="my-1" controlId='password'>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                type='password'
                placeholder="Enter Your Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                ></Form.Control>
            </Form.Group>
            <Form.Group className="my-1" controlId='password2'>
                <Form.Label>Confirm Your Password:
                </Form.Label>
                <Form.Control
                type="password"
                placeholder="Enter Your Password again"
                value={password2}
                onChange={(e)=>{setPassword2(e.target.value)}}
                >
                </Form.Control>
            </Form.Group>
            {isLoading && <Loader />}
            <Button type='submit' variant='primary' className='mt-3' >
                Confirm
            </Button>
            <Row className="py-2">
                <Col>
                Already have an account? <Link to='/login'>Login</Link>
                </Col>
            </Row>
        </Form>
    </FormContainer>
    
  )
}

export default RigesterScreen