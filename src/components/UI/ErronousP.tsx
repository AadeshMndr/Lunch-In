interface Props {
    message: string | undefined;
}

const ErronousP: React.FC<Props> = ({ message }) => {
    return <p className="text-red-600 mb-4 text-center text-lg">{ message || "Invalid Input !" }</p>
}

export default ErronousP;