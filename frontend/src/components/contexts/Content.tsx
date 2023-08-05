import { createContext } from "react";
import notes from '../../api/note';

const defaultData = await notes.getAllNotes().then((r) => r.data);
export const ContentContext = createContext(defaultData[0].content);
