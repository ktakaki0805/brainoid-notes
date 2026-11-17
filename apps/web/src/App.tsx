import { Center } from '@astryxdesign/core/Center';
import { Heading } from '@astryxdesign/core/Heading';
import { HStack } from '@astryxdesign/core/HStack';
import { Layout, LayoutContent } from '@astryxdesign/core/Layout';
import { StatusDot } from '@astryxdesign/core/StatusDot';
import { Text } from '@astryxdesign/core/Text';
import { Thumbnail } from '@astryxdesign/core/Thumbnail';
import { VStack } from '@astryxdesign/core/VStack';
import { useEffect, useState } from 'react';

type ApiState = 'checking' | 'ok' | 'down';

const API_STATUS: Record<
  ApiState,
  { variant: 'neutral' | 'success' | 'error'; label: string; text: string }
> = {
  checking: { variant: 'neutral', label: '確認中', text: 'APIサーバーを確認しています' },
  ok: { variant: 'success', label: '正常', text: 'APIサーバーにつながっています' },
  down: {
    variant: 'error',
    label: '異常',
    text: 'APIサーバーにつながりません（pnpm dev で起動しているか確認）',
  },
};

/**
 * ひな型の確認用の画面。画面の枠は T-004 で AppShell に置き換える。
 * 部品は Astryx から選ぶ。使い方は `pnpm astryx component <名前>`、決まりは docs/design/ui.md。
 */
export function App() {
  const [api, setApi] = useState<ApiState>('checking');

  useEffect(() => {
    let alive = true;
    fetch('/api/health')
      .then((res) => {
        if (alive) setApi(res.ok ? 'ok' : 'down');
      })
      .catch(() => {
        if (alive) setApi('down');
      });
    return () => {
      alive = false;
    };
  }, []);

  const status = API_STATUS[api];

  return (
    <Layout height="auto">
      <LayoutContent role="main" label="Brainoid Notes" isScrollable={false}>
        <Center minHeight="100dvh" padding={6}>
          <VStack gap={3} hAlign="center">
            <Thumbnail src="/logo.png" alt="Brainoid のロゴ" />
            <Heading level={1}>Brainoid Notes</Heading>
            <Text color="secondary">ひな型が動いています。</Text>
            <HStack gap={2} vAlign="center">
              <StatusDot variant={status.variant} label={status.label} />
              <Text type="supporting">{status.text}</Text>
            </HStack>
          </VStack>
        </Center>
      </LayoutContent>
    </Layout>
  );
}
