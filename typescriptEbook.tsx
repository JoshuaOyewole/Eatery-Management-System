import React, { useState } from 'react'

type Props = {}

const typescriptEbook = (props: Props) => {
    const [age, setAge] = useState<number>()
    let name:string = "Joshua Oyewole";

 /*    name = 50; */

    function calculateAge(dob: number) {
        const currentYear = new Date().getFullYear();
        const age = currentYear - dob;
        setAge(age)
    }

    calculateAge(1970);

    return (
        <div>Your Age: {age}</div>
    )
}

export default typescriptEbook