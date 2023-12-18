import Title from "@/components/UI/Title";

interface LayoutProps {
  children: React.ReactNode;
}

const MenuLayout = ({ children }: LayoutProps) => {
  return (
    <div className="sm:p-5 p-3 min-h-screen">
        <Title size={"large"} colorScheme={"primary"} spaceScheme={"spaceBelow"}>
          Menu
        </Title>
        {children}
    </div>
  );
};

export default MenuLayout;
