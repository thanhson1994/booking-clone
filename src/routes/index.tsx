import React, {Suspense} from 'react'
import {useRoutes} from 'react-router-dom'

type LoadComponentProps = {
  // eslint-disable-next-line no-undef
  component: React.LazyExoticComponent<() => JSX.Element>
}
const loading = () => <div className=''></div>

const HomePage = React.lazy(() => import('../pages/homepage/HomePage'))
const HotelLists = React.lazy(() => import('../pages/hotelLists/HotelLists'))
const Hotel = React.lazy(() => import('../pages/hotel/Hotel'))

export const LoadComponent = ({component: Component}: LoadComponentProps) => (
  <Suspense fallback={loading()}>
    <Component />
  </Suspense>
)

const AllRoutes = () => {
  return useRoutes([
    {
      path: '/',
      element: <LoadComponent component={HomePage} />,
    },
    {
      path: '/hotels',
      children: [
        {
          path: '',
          element: <LoadComponent component={HotelLists} />,
        },
        {
          path: ':hotelId',
          element: <LoadComponent component={Hotel} />,
        },
      ],
    },
  ])
}

export {AllRoutes}
