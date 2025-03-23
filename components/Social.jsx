import Link from "next/link";
import { FaGithub,FaLinkedinIn,FaInstagram  } from "react-icons/fa";

const socials =[
    {icons: <FaGithub/>, path:'https://github.com/GKRBROS'},
    {icons: <FaLinkedinIn/>, path:'https://www.linkedin.com/in/gokul-kiran-r-140ab721b?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BkaeRkFjNTHyO5NbRapcPpQ%3D%3D'},
    {icons: <FaInstagram/>, path:'https://www.instagram.com/_.gkr._/'},
]

const Social = ({containerStyles, iconStyles}) => {
    return ( 
        <div className={containerStyles}>
            {socials.map((item,index)=>{
                return <Link key={index} href={item.path} className={iconStyles}>
                    {item.icons}
                </Link>
            })}
        </div>
    );
};
export default Social;