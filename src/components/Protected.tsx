import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props: { children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => {
    const [isTokenExist, setIsTokenExist] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsTokenExist(true)
        } else {
            navigate("/login");
        }
    }, [navigate])

    return (
        <div>
            {isTokenExist ? props.children : null}
        </div>
    )
}

export default Protected