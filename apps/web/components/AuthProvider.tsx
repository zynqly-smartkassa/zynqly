import { useGetAccessTkQuery } from '@/redux/api/apis/auth'
import React, { useEffect } from 'react'

const AuthProvider = ({children}: {children: React.ReactNode}) => {


    const {data, isLoading} = useGetAccessTkQuery();

    useEffect(() => {
        console.log(data);
    }, [data, isLoading])

  return (
    <>
    {children}
    </>
  )
}

export default AuthProvider