import { useRouter } from "next/router"

const homepage = () => {
    
    const router = useRouter();
    const {username} = router.query;

    return(
        <div>nice, its {username}</div>
    )
}

export default homepage