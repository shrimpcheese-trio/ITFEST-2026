import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Markdown({ children }: { children: string }) {
  return (
    <div className="text-sm leading-relaxed [&_a]:text-info [&_a]:underline [&_a]:underline-offset-2 [&_code]:rounded [&_code]:bg-soft-cloud [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_h1]:mb-2 [&_h1]:font-semibold [&_h1]:text-base [&_h2]:mb-2 [&_h2]:font-semibold [&_h2]:text-base [&_h3]:mb-1 [&_h3]:font-semibold [&_h3]:text-sm [&_li]:mb-1 [&_ol]:mb-2 [&_ol]:list-decimal [&_ol]:pl-4 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_pre]:mb-2 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-soft-cloud [&_pre]:px-3 [&_pre]:py-2 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_strong]:font-semibold [&_table]:mb-2 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-hairline-soft [&_td]:px-2 [&_td]:py-1 [&_th]:border [&_th]:border-hairline-soft [&_th]:px-2 [&_th]:py-1 [&_th]:font-semibold [&_ul]:mb-2 [&_ul]:list-disc [&_ul]:pl-4">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}