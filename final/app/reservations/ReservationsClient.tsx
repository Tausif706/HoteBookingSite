"use client"
import { useRouter } from "next/navigation"
import { Container } from "../components/Container"
import { Heading } from "../components/Heading"
import { SafeReservation, SafeUser } from "../types"
import { useCallback, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import ListingCard from "../components/listings/ListingCard"
import useLoadingModel from "../hooks/UseLoadingModel"

interface ReservationsClientProps {
    reservations: SafeReservation[],
    currentUser?: SafeUser | null
}

const ReservationsClient : React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser,
}) => {
    const register = useLoadingModel();
    const router = useRouter();
    const [isLoading,setisLoading] = useState(false);
    const [deletingId,setdeletingId] = useState('')

    const onCancel = useCallback((id: string) => {
        setdeletingId(id)
        setisLoading(true)
        register.onOpen()
        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success('reservation cancelled')
            router.refresh();
        })
        .catch(() => {
            toast.error('something went wrong')
        })
        .finally(() => {
            register.onClose()
            setdeletingId('')
            setisLoading(false)
        })
    },[router,register])
  return (
    <Container>
        <Heading
            title="Reservations"
            subtitle="Bookings on your properties"
        />
        <div className="
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
        ">
            {reservations.map((reservation) => (
                <ListingCard 
                    key={reservation.id}
                    data={reservation.listing}
                    reservation={reservation}
                    actionId={reservation.id}
                    onAction={onCancel}
                    disabled={deletingId=== reservation.id}
                    actionLabel="Cancel Guest reservation"
                    currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
  )
}
export default ReservationsClient