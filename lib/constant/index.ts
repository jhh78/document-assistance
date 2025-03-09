const MENUS: Array<{
  name: string;
  className?: string;
  description: string;
  icon: JSX.Element;
  link: string;
}> = [
  {
    name: "Typing Game",
    className: styles.onlyPC,
    description: "Enjoy typing games and measure your accuracy",
    icon: <SlGameController />,
    link: "/typing",
  },
  {
    name: "Text Converter",
    description: "Convert text to another format",
    icon: <MdOutlineSwapVerticalCircle />,
    link: "/converter",
  },
  {
    name: "Password Maker",
    description: "Create your own creative password.",
    icon: <CgPassword />,
    link: "/password",
  },
  {
    name: "Search Holiday",
    description: "When will the holiday be? I'm looking forward to it.",
    icon: <IoTodayOutline />,
    link: "/holiday",
  },
  {
    name: "PDF Slicer",
    description: "Split PDF files into multiple files.",
    icon: <FaRegFilePdf />,
    link: "/pdf-slice",
  },
  // {
  //   name: "Tool 6",
  //   description: "Description for Tool 6",
  //   icon: <FaPencilRuler />,
  //   link: "/tool6",
  // },
];
