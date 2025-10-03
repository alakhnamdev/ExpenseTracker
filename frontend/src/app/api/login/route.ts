import { NextRequest, NextResponse } from "next/server";

interface LoginRequestBody {
    email: string;
    password: string;
}

interface cookieOptionsProps {
    httpOnly: boolean;
    secure: boolean;
    sameSite: "none";
    maxAge: number;
}

export async function POST(req: NextRequest) {
    try {
        console.log("Login Request Initiated");
        const { email, password } : LoginRequestBody = await req.json();

        const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: "include",
        });

        if (!backendRes.ok) {
            const errorData = await backendRes.json();
            return NextResponse.json(
                { error: errorData || "Login with backend failed" },
                { status: backendRes.status }
            );
        }

        const data = await backendRes.json();
        const cookieOptions : cookieOptionsProps = {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        };

        const response = NextResponse.json({ email: data.email });
        response.cookies.set("token", data.token, cookieOptions);
        return response;
    } catch (error) {
        return NextResponse.json(
            { error: error || "Internal Server Error" },
            { status: 500 }
        );
    }
}
