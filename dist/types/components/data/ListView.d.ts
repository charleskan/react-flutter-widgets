import type { ReactNode } from 'react';
import type { ListViewProps } from '../../types/ListView.type';
declare function ListView<T>(props: ListViewProps<T>): import("react/jsx-runtime").JSX.Element;
declare namespace ListView {
    var builder: <T>(props: ListViewProps<T>) => import("react/jsx-runtime").JSX.Element;
    var separated: <T>(props: ListViewProps<T> & {
        separatorBuilder: (index: number) => ReactNode;
    }) => import("react/jsx-runtime").JSX.Element;
}
export default ListView;
//# sourceMappingURL=ListView.d.ts.map