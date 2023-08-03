import Image from "next/image";
import { SafeReservation, SafeUser } from "../types";
import { Container } from "../components/Container";
import { PaymentInfoPart } from "./PaymentInfoPart";
import { PaymentGatewayPart } from "./PaymentGatewayPart";

interface PaymentGateProps {
    currentUser: SafeUser | null;
    reservations: SafeReservation[];
}

const PaymentGate : React.FC<PaymentGateProps> = ({
    currentUser,
    reservations,
}) => {
    let totalpriceAfterPayment = 0;
    reservations.map((reservation) => (
        totalpriceAfterPayment += reservation.totalPrice
    ))
  return (
    <Container>
        <div className="max-w-screen-lg mx-auto">
            <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        md:gap-12
                        mt-6
                    ">
                    <PaymentInfoPart />
                    <PaymentGatewayPart />    
            </div>
        </div>
    </Container>
  )
}

export default PaymentGate;
