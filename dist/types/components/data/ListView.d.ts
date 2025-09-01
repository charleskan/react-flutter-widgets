import type { ReactNode } from 'react';
import type { ListViewProps } from '../../types/ListView.type';
/**
 * ListView component equivalent to Flutter's ListView widget.
 * Efficiently renders a scrollable list of items with customizable layout and behavior.
 *
 * @example
 * ```tsx
 * // Basic list with items array
 * <ListView
 *   items={['Item 1', 'Item 2', 'Item 3']}
 *   itemBuilder={(item, index) => <div key={index}>{item}</div>}
 *   scrollDirection={ScrollDirection.VERTICAL}
 * />
 *
 * // Builder pattern with itemCount
 * <ListView
 *   itemCount={100}
 *   itemBuilder={(_, index) => <div key={index}>Item {index}</div>}
 *   separatorBuilder={(index) => <div key={`sep-${index}`} style={{height: 1, background: '#ccc'}} />}
 * />
 *
 * // Horizontal scrolling list
 * <ListView
 *   items={data}
 *   itemBuilder={(item, index) => <Card key={index} data={item} />}
 *   scrollDirection={ScrollDirection.HORIZONTAL}
 *   padding={EdgeInsets.all(16)}
 * />
 * ```
 */
declare function ListView<T>(props: ListViewProps<T>): import("react/jsx-runtime").JSX.Element;
declare namespace ListView {
    var builder: <T>(props: ListViewProps<T>) => import("react/jsx-runtime").JSX.Element;
    var separated: <T>(props: ListViewProps<T> & {
        separatorBuilder: (index: number) => ReactNode;
    }) => import("react/jsx-runtime").JSX.Element;
}
export default ListView;
//# sourceMappingURL=ListView.d.ts.map