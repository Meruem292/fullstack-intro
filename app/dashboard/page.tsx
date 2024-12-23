import { LogoutButton } from "@/components/logout-button";;


export default function Dashboard(){
    return(
        <main className="align-center justify-center flex flex-col h-screen space-y-4">
            <h1>DASHBOARD</h1>
            <LogoutButton />
        </main>
    )
}