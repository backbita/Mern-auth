import { useState, useEffect } from "react"
import {Form, Button} from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import FormContainer from "../components/FormContainer"
import { setCredentials } from "../slices/authSlice"
import { toast } from "react-toastify"
import Loader from '../components/Loader'
import { useUpdateMutation } from "../slices/usersApiSlice"



const ProfileScreen = () => {
    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[password2, setPassword2] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [update, {isLoading}] = useUpdateMutation()

    const { userInfo } = useSelector(state => state.auth)

    useEffect(()=>{
     setName(userInfo.name)
     setEmail(userInfo.email)
    },[userInfo.name, userInfo.email])

    const submitHandler= async(e) =>{
        e.preventDefault()
        if(password !== password2){
            toast.error('passwords do not match')
        } else {
            try {
                const response = await update({name, email, password}).unwrap()
                dispatch(setCredentials({...response}))
                toast.success('Updated')
            } catch (err) {
                toast.error(err.data.message|| err.error)
            }
        }
    }

  return (
    <FormContainer>
        <h1>Update Your Profile</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className="my-1" controlId='name'>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                type='text'
                placeholder="Enter Your Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="my-1" controlId='email'>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                type='email'
                placeholder="Enter Your Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group className="my-1" controlId='password'>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                type='password'
                placeholder="Enter Your Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
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
                Update
            </Button>
        </Form>
    </FormContainer>
    
  )
}

export default ProfileScreen