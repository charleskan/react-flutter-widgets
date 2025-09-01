import type { Key, ReactNode } from 'react'
import { useMemo } from 'react'
import { Flex } from '../../types/Flex.type'
import type { ListViewProps } from '../../types/ListView.type'
import {
  CrossAxisAlignment,
  ListView as ListViewUtils,
  MainAxisAlignment,
  ScrollDirection,
  ScrollPhysics,
} from '../../types/ListView.type'

function useListViewHook<T>({
  items = [],
  itemCount,
  itemBuilder,
  separatorBuilder,
  keyExtractor,
}: Pick<
  ListViewProps<T>,
  'items' | 'itemCount' | 'itemBuilder' | 'separatorBuilder' | 'keyExtractor'
>) {
  const effectiveItemCount = itemCount ?? items.length
  const effectiveItems = items.length > 0 ? items : Array(effectiveItemCount).fill(null)

  const rendered = useMemo(() => {
    const out: { key: Key; element: ReactNode }[] = []

    for (let index = 0; index < effectiveItemCount; index++) {
      const item = effectiveItems[index] || null
      const itemKey = keyExtractor ? keyExtractor(item, index) : `item-${index}`

      out.push({
        key: itemKey,
        element: itemBuilder(item, index),
      })

      if (index < effectiveItemCount - 1 && separatorBuilder) {
        out.push({
          key: `separator-${index}`,
          element: separatorBuilder(index),
        })
      }
    }

    return out
  }, [effectiveItems, effectiveItemCount, itemBuilder, separatorBuilder, keyExtractor])

  return {
    rendered,
    itemCount: effectiveItemCount,
  }
}

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
function ListView<T>(props: ListViewProps<T>) {
  const {
    items,
    itemCount,
    itemBuilder,
    separatorBuilder,
    keyExtractor,
    scrollDirection = ScrollDirection.VERTICAL,
    reverse = false,
    shrinkWrap = false,
    physics = ScrollPhysics.BOUNCING,
    crossAxisAlignment = CrossAxisAlignment.STRETCH,
    mainAxisAlignment = MainAxisAlignment.START,
    padding,
    paddingAll,
    paddingHorizontal,
    paddingVertical,
    flexible,
    expanded,
    flex,
    clipBehavior = 'visible',
  } = props

  const { rendered } = useListViewHook({
    items,
    itemCount,
    itemBuilder,
    separatorBuilder,
    keyExtractor,
  })

  const effectivePadding = ListViewUtils.calculatePadding({
    paddingAll,
    paddingHorizontal,
    paddingVertical,
    padding,
  })

  const flexStyles = Flex.buildFlexStyles({
    flex,
    expanded,
    flexible,
  })

  const scrollDirectionClasses = ListViewUtils.getScrollDirectionClasses(scrollDirection)
  const physicsClassName = ListViewUtils.getPhysicsClassName(physics)
  const crossAxisClass = ListViewUtils.getCrossAxisAlignmentClass(
    crossAxisAlignment,
    scrollDirection,
  )
  const mainAxisClass = ListViewUtils.getMainAxisAlignmentClass(mainAxisAlignment, scrollDirection)

  const containerClasses = [
    'flex',
    scrollDirectionClasses,
    physicsClassName,
    crossAxisClass,
    mainAxisClass,
    shrinkWrap ? 'flex-shrink' : '',
    clipBehavior === 'hidden' ? 'overflow-hidden' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const containerStyle: React.CSSProperties = {
    ...flexStyles,
    padding: effectivePadding,
    ...(reverse && {
      flexDirection: (scrollDirection === ScrollDirection.VERTICAL
        ? 'column-reverse'
        : 'row-reverse') as React.CSSProperties['flexDirection'],
    }),
  }

  return (
    <div className={containerClasses} style={containerStyle}>
      {rendered.map(({ key, element }) => (
        <div key={key}>{element}</div>
      ))}
    </div>
  )
}

ListView.builder = <T,>(props: ListViewProps<T>) => ListView(props)

ListView.separated = <T,>(
  props: ListViewProps<T> & { separatorBuilder: (index: number) => ReactNode },
) => ListView(props)

export default ListView
