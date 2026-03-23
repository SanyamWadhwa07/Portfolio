import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await resend.emails.send({
      // Free tier: send from Resend's own domain to your email (no domain setup needed)
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["sanyamwadhwa.in@gmail.com"],
      replyTo: email,
      subject: `New message from ${name} — portfolio`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
          <h2 style="color:#1c1814;border-bottom:2px solid #007060;padding-bottom:8px">
            New portfolio message
          </h2>
          <p style="color:#6b5c4e"><strong>From:</strong> ${name}</p>
          <p style="color:#6b5c4e"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <div style="background:#f8f4ee;border-left:3px solid #007060;padding:16px;margin-top:16px;border-radius:4px">
            <p style="color:#1c1814;white-space:pre-wrap;margin:0">${message}</p>
          </div>
          <p style="color:#a89484;font-size:12px;margin-top:24px">Sent via sanyamwadhwa.dev portfolio</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
