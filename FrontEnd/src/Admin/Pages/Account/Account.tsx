import ProfileFieldCard from '../../../Component/ProfileFieldCard'
import { Divider } from '@mui/material'
import { useAppSelector } from '../../../State/Store'

const Account = () => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  
  const {auth} = useAppSelector(store => store)

  return (
    <div>
          <div className="w-full lg:w-[70%]">
        <div className="flex justify-between items-center pb-3">
          <h1 className="font-bold text-gray-600 text-2xl">Personal Details</h1>
        </div>
        <div>

          <ProfileFieldCard keys='Admin Name' value={auth.user?.fullname || "Not Provided"} />
          <Divider />
          <ProfileFieldCard keys='Admin Email' value={auth.user?.email || "Not Provided"} />
          <Divider />
          <ProfileFieldCard keys='Mobile' value={auth.user?.mobile || "Not Provided"} />
        </div>
      </div>

    </div>
  )
}

export default Account