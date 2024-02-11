interface ErrorPageProps {
    message: string
}

export default function ErrorPage({ message }: ErrorPageProps) {
    return (
        <h2>{message}</h2>
    )
}