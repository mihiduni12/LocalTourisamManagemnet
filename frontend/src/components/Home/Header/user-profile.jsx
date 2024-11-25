import { UserProfile } from "@clerk/clerk-react"
import { SearchBar } from "./SearchBar"
import {
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Logo from "./logo"

export default function UserProfilePage() {

  return (
    <div className="bg-[#f0f0f0] h-[100%] mt-[-20px]">
      <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.5.1/css/all.css" />

      <div className="flex pt-[40px] ml-[20px]">

        <div className="w-[310px] h-[1400px] mr-[10px] border border-[#d3d3d3] rounded-[14px] bg-[#ffffff]">
          <div className="mt-[30px] ml-[55px] font-Spirax absolute text-[24pt] px-[10px] border border-[#000] rounded-[11px] py-[8px]">CeylonVibes</div>
          <div className="border py-[6px] pb-[15px] mt-[110px] mx-[20px] rounded-[11px]">

            <div className="mx-auto mt-[10px] py-[11px] pl-[20px] w-[240px] rounded-[8px] bg-[#ffffff] text-[#414141] text-[14pt] hover:bg-[#dedede]"><i class="fa-duotone fa-house mr-[16px]" style={{"--fa-primary-color": "#d3bf05", "--fa-secondary-color": "#d3bf05",}}/>Dashboard</div>
            <div className="mx-auto mt-[5px] py-[13px] pl-[20px] w-[240px] rounded-[8px] bg-[#333333] text-[#ffffff] text-[14pt] hover:bg-[#000]"><i class="fa-duotone fa-user-vneck mr-[19px] ml-[2px]"  />Profile</div>
            <div className="mx-auto mt-[5px] py-[11px] pl-[20px] w-[240px] rounded-[8px] bg-[#ffffff] text-[#414141] text-[14pt] hover:bg-[#dedede]"><i class="fa-duotone fa-envelope mr-[18px] ml-[-1px] pt-[5px] text-[17pt]" style={{"--fa-primary-color": "#d3bf05", "--fa-secondary-color": "#d3bf05",}} />Notifications</div>
            <div className="mx-auto mt-[5px] py-[11px] pl-[20px] w-[240px] rounded-[8px] bg-[#ffffff] text-[#414141] text-[14pt] hover:bg-[#dedede]"><i class="fa-duotone fa-gear mr-[18px] ml-[4px]" style={{"--fa-primary-color": "#d3bf05", "--fa-secondary-color": "#d3bf05",}} />Settings</div>

          </div>
        </div>

        <div className="w-[1120px] ml-[20px]">
          <div className="h-[90px] flex bg-[#ffffff] rounded-[14px] border border-[#cfcfcf]">
            <div className="pt-[20px] pl-[30px] text-[12pt]">
              <div className="w-[170px]">ACCOUNT / Profile</div>
              <div className="font-bold">PROFILE</div>
            </div>
            <div className="pt-[20px] pl-[380px]"><SearchBar /></div>
          </div>
          <CardHeader variant="gradient" color="gray" className="mt-[20px] mb-8 p-6">
                            <Typography variant="h6" color="white">                                
                                MANAGE ACCOUNT INFO 
                            </Typography>
                        </CardHeader>
          <div className="mt-[-80px] border bg-[#ffffff] rounded-[7px] pl-[70px] pt-[80px] h-[1470px]">
            <UserProfile appearance={{
              variables: {
                colorPrimary: "#edac12",
                colorTextOnPrimaryBackground: "black",
                colorText: "black"
              }
            }} />
          </div>
        </div>
      </div>
    </div>
  )
}