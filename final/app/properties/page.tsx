
// import getCurrentUser from "../actions/getCurrentUser"
// import getListings from "../actions/getListings";
// import getReservations from "../actions/getReservations";
// import { ClientOnly } from "../components/ClientOnly";
// import EmptyState from "../components/EmptyState";
// import TripsClient from "./PropertiesClient";



// const PropertiesPage = async () => {
//     const currentUser = await getCurrentUser();
//     if(!currentUser){
//         return (
//             <ClientOnly>
//                 <EmptyState
//                     title='Unauthorized User'
//                     subtitle="Please Login"
//                 />
//             </ClientOnly>
//         )
//     }

//     const listings = await getListings({
//         userId: currentUser.id
//     })

//     if(listings.length===0){
//         return ( 
//             <ClientOnly>
//                 <EmptyState
//                     title="No properties found"
//                     subtitle="Looks like you haven no properties"
//                 />
//             </ClientOnly>
//         )
//     }

//     return (
//         <ClientOnly>
//             <TripsClient
//                 listings={listings}
//                 currentUser={currentUser}
//             />
//         </ClientOnly>
//     )

// }

// export default PropertiesPage;


import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import getReservations from "../actions/getReservations";
import { ClientOnly } from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import TripsClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized User" subtitle="Please Login" />
      </ClientOnly>
    );
  }

  const listingsResult = await getListings({
    userId: currentUser.id
  });

  const listings = listingsResult.map(listing => ({
    ...listing,
    createdAt: listing.createdAt.toISOString()
  }));

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you haven't added any properties"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertiesPage;
