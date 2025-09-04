"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, Users, Phone, Mail } from "lucide-react"

interface FormData {
  name: string
  phone: string
  email: string
  date: string
  time: string
  guests: string
  notes: string
}

interface FormErrors {
  [key: string]: string
}

export function ReservationModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    guests: "2",
    notes: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.date) newErrors.date = "Date is required"
    if (!formData.time) newErrors.time = "Time is required"
    if (!formData.guests || Number.parseInt(formData.guests) < 1) newErrors.guests = "Number of guests is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("[v0] Reservation submitted:", formData)
      setIsOpen(false)
      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        date: "",
        time: "",
        guests: "2",
        notes: "",
      })
      setErrors({})
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    // <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <Dialog open={false}>
      <DialogTrigger asChild>
        {/* <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 font-medium">
          Reserve a Table
        </Button> */}
      </DialogTrigger>
      <DialogContent className="reservation-modal max-w-md">
        <DialogHeader className="text-center pb-4">
          <DialogTitle className="reservation-title">Reserve Your Table</DialogTitle>
          <p className="text-muted-foreground">Experience fine dining at Atha Resort</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="form-field">
              <Label htmlFor="name" className="form-label">
                <Users className="h-4 w-4 inline mr-2" />
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Your name"
                className={`form-input ${errors.name ? "border-destructive" : ""}`}
              />
              {errors.name && <div className="form-error">{errors.name}</div>}
            </div>
            <div className="form-field">
              <Label htmlFor="phone" className="form-label">
                <Phone className="h-4 w-4 inline mr-2" />
                Phone
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Your phone"
                className={`form-input ${errors.phone ? "border-destructive" : ""}`}
              />
              {errors.phone && <div className="form-error">{errors.phone}</div>}
            </div>
          </div>

          <div className="form-field">
            <Label htmlFor="email" className="form-label">
              <Mail className="h-4 w-4 inline mr-2" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="your.email@example.com"
              className={`form-input ${errors.email ? "border-destructive" : ""}`}
            />
            {errors.email && <div className="form-error">{errors.email}</div>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-field">
              <Label htmlFor="date" className="form-label">
                <Calendar className="h-4 w-4 inline mr-2" />
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className={`form-input ${errors.date ? "border-destructive" : ""}`}
              />
              {errors.date && <div className="form-error">{errors.date}</div>}
            </div>
            <div className="form-field">
              <Label htmlFor="time" className="form-label">
                <Clock className="h-4 w-4 inline mr-2" />
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                className={`form-input ${errors.time ? "border-destructive" : ""}`}
              />
              {errors.time && <div className="form-error">{errors.time}</div>}
            </div>
          </div>

          <div className="form-field">
            <Label htmlFor="guests" className="form-label">
              <Users className="h-4 w-4 inline mr-2" />
              Number of Guests
            </Label>
            <Input
              id="guests"
              type="number"
              min="1"
              max="20"
              value={formData.guests}
              onChange={(e) => handleInputChange("guests", e.target.value)}
              className={`form-input ${errors.guests ? "border-destructive" : ""}`}
            />
            {errors.guests && <div className="form-error">{errors.guests}</div>}
          </div>

          <div className="form-field">
            <Label htmlFor="notes" className="form-label">
              Special Requests
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Any dietary restrictions or special occasions..."
              className="form-input min-h-[80px]"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-medium text-lg"
          >
            Confirm Reservation
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
