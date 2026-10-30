import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
    
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      // Más elementos aquí...
      {
        icon: "/parent.png",
        label: "vocabulario",
        href: "/list/vocabulario",
        visible: ["admin", "teacher"],
      },
     
      {
        icon: "/lesson.png",
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher","student"],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student"],
      },
      
      {
        icon: "/result.png",
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },

      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = ({ isExpanded }: { isExpanded: boolean }) => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-1" key={i.title}>
          {/* Título de la sección */}
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {/* Ítems del menú */}
          <div className="flex flex-col justify-center gap-2">
            {i.items.map((item) =>{
              if(item.visible.includes(role)){
                return(
                  <Link href={item.href} key={item.label}>
                    <div className="flex items-center justify-center lg:justify-start gap-2  hover:bg-blue-900 text-gray-300 py-2 md:px  rounded-md">
                  <Image src={item.icon} alt={item.label} width={23} height={23} />
                  {isExpanded && 
                  <span className="hidden lg:block">{item.label}</span>}
                </div>
              </Link>
            )
              }
            } )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
