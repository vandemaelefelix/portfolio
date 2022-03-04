import { useState } from 'react';

export default function useCustomCursor(parent: HTMLElement): any {
    const [cursor, setCursor] = useState(null);

    return cursor;
}
