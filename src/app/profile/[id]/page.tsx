interface UserProfileParams {
    params: Promise<{
        id: string;
    }>;
}

export default async function UserProfile({ params }: UserProfileParams) {
    const { id } = await params;
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <hr className="w-64 mb-4"/>

            <p className="text-lg">
                Profile Page:
                <span className="ml-2 px-2 py-1 bg-red-200  text-black rounded">
                    {id}
                </span>
            </p>
        </div>
    );
}