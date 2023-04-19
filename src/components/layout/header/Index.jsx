import React from 'react'
import { useSelector } from 'react-redux'

function Index() {
  const name = useSelector(state=> state.username);

  console.log(name);
  return (
    <header>Welcome to Orisfina {name} Oyewole</header>
  )
}

export default Index