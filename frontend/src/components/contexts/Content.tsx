import { createContext } from "react";
import notesAPI from '../../api/note';

//const defaultData = await notesAPI.fetchNotesByUser().then((r) => r.data);
//defaultData[0].content
export const ContentContext = createContext("");