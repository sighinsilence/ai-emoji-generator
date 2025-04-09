import { EmojiContextProps } from "@/server/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { formatPrompt } from "@/lib/utils";
import { getEmoji } from "@/server/get-emoji";

// 动态导入组件
const loadEmojiCard = async () => {
  const { EmojiCard } = await import("@/app/_components/emoji-card");
  return EmojiCard;
};

const loadPageContent = async () => {
  const { PageContent } = await import("@/app/_components/page-content");
  return PageContent;
};

export async function generateMetadata({ params }: EmojiContextProps): Promise<Metadata | undefined> {
  const data = await getEmoji(params.id);
  if (!data) return;

  const title = `${formatPrompt(data.prompt)} | AI Emoji Generator`;
  const description = `An emoji generated from the prompt: ${data.prompt}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@pondorasti",
    },
  };
}

export default async function Emoji({ params }: EmojiContextProps) {
  const data = await getEmoji(params.id);
  if (!data) redirect("/");

  const EmojiCard = await loadEmojiCard();
  const PageContent = await loadPageContent();

  return (
    <PageContent prompt={data.prompt}>
      <EmojiCard id={params.id} alwaysShowDownloadBtn />
    </PageContent>
  );
}
