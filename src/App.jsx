import { useState } from 'react'
import { Routes,Route} from "react-router-dom";
import { Home } from './pages/Home';
import { Crud } from './pages/Crud';
import { Details } from './components/Home/Details';
import { Dashboard } from './pages/Dashboard';
import { CreateBill } from './pages/CreateBill';

function App()
{
  return (
  <>
  <div 
    className="bg-white 
    bg-gradient-to-tr from-blue-600 via-cyan-600 to-purple-600  flex flex-col items-center  ">
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        
        <Route path='/details' element={<Details/>}/>
       
        <Route path='/dashboard' element={ <Dashboard/>}>
          <Route path='createbill' element={<CreateBill/>}/>
          <Route path='Crud' element={ <Crud/>}/>
        </Route>
    </Routes>
    <h1 className='text-white text-center mt-5 font-semibold tracking-wide my-5'>Created by <strong>Roniwilliams</strong> </h1>
    </div>
  </>
  )
}

export default App
