import CreateRoom from "../components/CreateRoom"

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <CreateRoom />
        </div>
    )
}

export default Home;