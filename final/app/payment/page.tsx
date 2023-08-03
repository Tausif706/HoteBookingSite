
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

import React from 'react'
import { ClientOnly } from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import PaymentGate from "./PaymentGate";

const PaymentPage = async () => {
  const currentUser = await getCurrentUser();
  if(!currentUser){
    return (
    <ClientOnly>
      <EmptyState
        title="Please Login"
        subtitle="Login to enjoy these features"
      />
    </ClientOnly>
  )  
}
const reservations = await getReservations({
  userId: currentUser.id
});
if(reservations.length === 0){
  return (
    <ClientOnly>
      <EmptyState
        title="No reservations"
        subtitle="Please make reservations to enjoy the trip"
      />
    </ClientOnly>
  )
}
  return (
    <ClientOnly>
      <PaymentGate 
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  )
}
export default PaymentPage;