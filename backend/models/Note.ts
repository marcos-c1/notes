class DTONote implements INote {
    public constructor(public title: string, public content: string) {
        this.title = title
        this.content = content
    }

    public insertNote() { }

    public getNote() { }

    public updateNote() { }

    public deleteNote() { }
}