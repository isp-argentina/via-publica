"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { passwordRegex } from "@/types/auth"

// Validador de email
export function useEmailValidator() {
  const [email, setEmail] = useState("")
  const [isValid, setIsValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  const validateEmail = (value: string) => {
    // Expresión regular para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // Prevenir caracteres especiales y emojis
    const specialCharsRegex = /[^\w@.-]/

    if (!value) {
      setIsValid(false)
      setErrorMessage("El email es requerido")
      return false
    } else if (specialCharsRegex.test(value)) {
      setIsValid(false)
      setErrorMessage("El email contiene caracteres no permitidos")
      return false
    } else if (!emailRegex.test(value)) {
      setIsValid(false)
      setErrorMessage("Ingrese un email válido")
      return false
    } else {
      setIsValid(true)
      setErrorMessage("")
      return true
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    validateEmail(value)
  }

  return {
    email,
    setEmail,
    isValid,
    errorMessage,
    handleChange,
    validateEmail,
  }
}

// Validador de teléfono
export function usePhoneValidator() {
  const [phone, setPhone] = useState("")
  const [isValid, setIsValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  const validatePhone = (value: string) => {
    // Solo permitir números
    const numbersOnly = /^\d+$/

    if (!value) {
      setIsValid(false)
      setErrorMessage("El teléfono es requerido")
      return false
    } else if (!numbersOnly.test(value)) {
      setIsValid(false)
      setErrorMessage("Solo se permiten números")
      return false
    } else if (value.length < 10) {
      setIsValid(false)
      setErrorMessage("El teléfono debe tener al menos 10 dígitos")
      return false
    } else {
      setIsValid(true)
      setErrorMessage("")
      return true
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "") // Eliminar cualquier caracter que no sea número
    setPhone(value)
    validatePhone(value)
  }

  return {
    phone,
    setPhone,
    isValid,
    errorMessage,
    handleChange,
    validatePhone,
  }
}

// Validador de contraseña
export function usePasswordValidator(validateMatch = false) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isValid, setIsValid] = useState(true)
  const [isMatchValid, setIsMatchValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [matchErrorMessage, setMatchErrorMessage] = useState("")

  const validatePassword = (value: string) => {
    if (!value) {
      setIsValid(false)
      setErrorMessage("La contraseña es requerida")
      return false
    } else if (!passwordRegex.test(value)) {
      setIsValid(false)
      setErrorMessage("La contraseña no cumple con los requisitos")
      return false
    } else {
      setIsValid(true)
      setErrorMessage("")
      return true
    }
  }

  const validatePasswordMatch = () => {
    if (validateMatch) {
      if (password !== confirmPassword) {
        setIsMatchValid(false)
        setMatchErrorMessage("Las contraseñas no coinciden")
        return false
      } else {
        setIsMatchValid(true)
        setMatchErrorMessage("")
        return true
      }
    }
    return true
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    validatePassword(value)
    if (validateMatch && confirmPassword) {
      validatePasswordMatch()
    }
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setConfirmPassword(value)
    if (validateMatch) {
      validatePasswordMatch()
    }
  }

  useEffect(() => {
    if (validateMatch) {
      validatePasswordMatch()
    }
  }, [password, confirmPassword, validateMatch])

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isValid,
    isMatchValid,
    errorMessage,
    matchErrorMessage,
    handlePasswordChange,
    handleConfirmPasswordChange,
    validatePassword,
    validatePasswordMatch,
  }
}
