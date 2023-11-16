import Title from "../UI/Title";

interface Props {

}

const TitleCard: React.FC<Props> = () => {
    return (
        <div className="z-20 left-[10%] absolute top-10 sm:left-[40%] bg-primaryBrown rounded-lg shadow-md shadow-primaryBrown200 p-10">
            <Title size={"large"} colorScheme={"primary"}>LUNCH IN</Title>
            <p className="text-center italic font-sans">Grab a quick and delicious meal!</p>
        </div>
    )
}

export default TitleCard