"use client"

import { useActionState } from "react"
import { loginAction, type BlogFormState } from "@/lib/actions/blog"

const initialState: BlogFormState = {}

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState)

  return (
    <form action={formAction} className="space-y-6 max-w-md w-full">
      <div className="space-y-2">
        <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full border border-border/50 bg-transparent px-4 py-3 font-mono text-sm outline-none focus:border-accent"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full border border-border/50 bg-transparent px-4 py-3 font-mono text-sm outline-none focus:border-accent"
        />
      </div>
      {state.error ? (
        <p className="font-mono text-xs text-destructive">{state.error}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full border border-accent bg-accent/10 px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-accent hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  )
}
