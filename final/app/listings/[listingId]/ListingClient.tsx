"use client"
import { Container } from "@/app/components/Container"
import ListingInfo from "@/app/components/listings/ListingInfo"
import ListingReservation from "@/app/components/listings/ListingReservation"
import { ListingHead } from "@/app/components/listings/listingHead"
import { catagories} from "@/app/components/navbar/Categories"
import useLoadingModel from "@/app/hooks/UseLoadingModel"
import { UseLoginModel } from "@/app/hooks/UseLoginModel"
import { UseRegisterModel } from "@/app/hooks/UseRegisterModel"
import { SafeReservation, SafeUser } from "@/app/types"
import { Listing, Reservation, User } from "@prisma/client"
import axios from "axios"
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Range } from "react-date-range"
import { toast } from "react-hot-toast"
interface ListingClientProps {
    reservations?:SafeReservation[]
    listing:Listing & {
        user:SafeUser
    }
    currentUser?: SafeUser | null;
}
const ListingClient : React.FC<ListingClientProps> = ({
    reservations = [],
    listing,
    currentUser
}) => {
    const loading = useLoadingModel()
    const initialDateRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }
    const loginModel = UseLoginModel()
    const router = useRouter()

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];
        reservations.forEach((reservation ) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })

            dates = [...dates,...range]
        })
        return dates;
    },[reservations])

    const [isLoading,setisLoading] = useState(false)
    const [totalPrice,settotalPrice] = useState(listing.price)
    const [dateRange,setdateRange] = useState<Range>(initialDateRange)

    const onCreateReservation = useCallback(() => {
        if(!currentUser){
            return loginModel.onOpen()
        }

        setisLoading(true);
        loading.onOpen()
        axios.post('/api/reservations',{
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id,
        })
        .then(() => {
            toast.success('Listing Reserved!')
            setdateRange(initialDateRange)
            //redirect to /trips
            router.push('/trips')
        })
        .catch(() => {
            toast.error('Something went wrong')
        })
        .finally(() => {
            loading.onClose()
            setisLoading(false)
        })
    },[totalPrice,dateRange,listing?.id,router,currentUser,loginModel])


    useEffect(() => {
        if(dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            )
            if(dayCount && listing.price){
                settotalPrice(dayCount * listing.price)
            }
            else {
                settotalPrice(listing.price)
            }
        }
    },[dateRange,listing.price])

    const category = useMemo(() => {
        return catagories.find((item) => 
        item.label === listing.category)
    },[listing.category])
  return (
    <Container>
        <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
                <ListingHead 
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    locationValue={listing.locationValue}
                    id={listing.id}
                    currentUser={currentUser}
                />
                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-7
                    md:gap-12
                    mt-6
                ">
                    <ListingInfo 
                        user={listing.user}
                        category={category}
                        description={listing.description}
                        roomCount={listing.roomCount}
                        guestCount={listing.guestCount}
                        bathroomCount={listing.bathroomCount}
                        locationValue={listing.locationValue}
                    />
                    <div 
                        className="
                            order-first
                            mb-10
                            md:order-last
                            md:col-span-3
                        ">
                    <ListingReservation 
                        price={listing.price}
                        totalPrice={totalPrice}
                        onChangeDate={(value) => setdateRange(value)}
                        dateRange={dateRange}
                        onSubmit={onCreateReservation}
                        disabled={isLoading}
                        disabledDates={disabledDates}
                    />
                    </div>
                </div>
            </div>
        </div>
    </Container>
  )
}

export default ListingClient
