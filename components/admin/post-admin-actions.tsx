"use client"

import { archivePostAction, deletePostAction } from "@/lib/actions/blog"

type Props = {
  id: string
  archived: boolean
}

export function PostAdminActions({ id, archived }: Props) {
  return (
    <div className="flex flex-wrap gap-2 shrink-0">
      <form action={archivePostAction}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="archived" value={archived ? "false" : "true"} />
        <button
          type="submit"
          className="border border-border/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] hover:border-accent hover:text-accent transition-colors"
        >
          {archived ? "Unarchive" : "Archive"}
        </button>
      </form>
      <form
        action={deletePostAction}
        onSubmit={(e) => {
          if (!window.confirm("Delete this post permanently? This cannot be undone.")) {
            e.preventDefault()
          }
        }}
      >
        <input type="hidden" name="id" value={id} />
        <button
          type="submit"
          className="border border-border/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-destructive/80 hover:border-destructive hover:text-destructive transition-colors"
        >
          Delete
        </button>
      </form>
    </div>
  )
}
