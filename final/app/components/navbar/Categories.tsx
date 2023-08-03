"use client"

import { IoDiamond } from 'react-icons/io5'
import { BsSnow } from 'react-icons/bs'
import { FaSkiing } from 'react-icons/fa'
import { TbBeach ,TbMountain,TbPool} from 'react-icons/tb'
import {
    GiWindmill,
    GiBarn,
    GiBoatFishing,
    GiCactus,
    GiCastle,
    GiCaveEntrance,
    GiForestCamp,
    GiIsland,
} from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import { Container } from '../Container'
import { CategoryBox } from '../CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'

export const catagories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach',
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property is close to the beach',
    },
    {
        label: 'GiBoatFishing',
        icon: GiBoatFishing,
        description: 'This property is close to the beach',
    },
    {
        label: 'GiBarn',
        icon: GiBarn,
        description: 'This property is close to the beach',
    },
    {
        label: 'GiCactus',
        icon: GiCactus,
        description: 'This property is close to the beach',
    },
    {
        label: 'GiCastle',
        icon: GiCastle,
        description: 'This property is close to the beach',
    },
    {
        label: 'GiCaveEntrance',
        icon: GiCaveEntrance,
        description: 'This property is close to the beach',
    },
    {
        label: 'GiForestCamp',
        icon: GiForestCamp,
        description: 'This property is close to the beach',
    },
    {
        label: 'GiIsland',
        icon: GiIsland,
        description: 'This property is close to the beach',
    },
    {
        label: 'TbMountain',
        icon: TbMountain,
        description: 'This property is close to the beach',
    },
    {
        label: 'TbPool',
        icon: TbPool,
        description: 'This property is close to the beach',
    },
    {
        label: 'IoDiamond',
        icon: IoDiamond,
        description: 'This property is close to the beach',
    },
    {
        label: 'BsSnow',
        icon: BsSnow,
        description: 'This property is close to the beach',
    },
    {
        label: 'FaSkiing',
        icon: FaSkiing,
        description: 'This property is close to the beach',
    },
    {
        label: 'MdOutlineVilla',
        icon: MdOutlineVilla,
        description: 'This property is close to the beach',
    },
]


function Categories() {
    const params = useSearchParams()
    const category = params?.get('category')
    const pathname = usePathname()

    const isMainPage = pathname === ('/')
    if(!isMainPage) {
        return null;
    }
  return (
    <Container>
    <div className='
        pt-2
        flex 
        flex-row
        items-center
        justify-between
        overflow-x-auto
    '>
        {catagories.map((item) => (
            <CategoryBox 
                key={item.label}
                label={item.label}
                selected={category === item.label}
                icon={item.icon}
            />
        ))}
    </div>
    </Container>
  )
}

export default Categories