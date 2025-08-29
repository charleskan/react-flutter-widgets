# React Flutter Widgets

A comprehensive Flutter-style UI component library for React applications. Build beautiful, consistent user interfaces using Flutter's proven design patterns and layout system.

## 🌟 Features

- **Pure Flutter Concepts**: No CSS classes, use Flutter's layout model
- **TypeScript Support**: Full type safety with comprehensive interfaces
- **Tree Shakable**: Import only the components you need
- **SSR Compatible**: Works with Next.js, Gatsby, and other SSR frameworks
- **Responsive**: Built-in responsive design patterns

## 📦 Installation

```bash
npm install react-flutter-widgets
# or
yarn add react-flutter-widgets
# or
bun add react-flutter-widgets
```

## 🚀 Quick Start

```tsx
import {
  Container,
  Row,
  Column,
  SizedBox,
  MainAxisAlignment,
  CrossAxisAlignment,
  EdgeInsets,
} from 'react-flutter-widgets'

function MyComponent() {
  return (
    <Container
      padding={EdgeInsets.all(16)}
      backgroundColor="#f5f5f5"
      borderRadius={8}
    >
      <Column mainAxisAlignment={MainAxisAlignment.CENTER}>
        <Container
          padding={EdgeInsets.symmetric({ horizontal: 12, vertical: 8 })}
          backgroundColor="#2196F3"
          borderRadius={4}
        >
          <span style={{ color: 'white' }}>Flutter-style Button</span>
        </Container>
        
        <SizedBox height={16} />
        
        <Row mainAxisAlignment={MainAxisAlignment.SPACE_BETWEEN}>
          <span>Left Item</span>
          <span>Right Item</span>
        </Row>
      </Column>
    </Container>
  )
}
```

## 📋 Components

### Layout Components

#### Container
The most versatile component, equivalent to Flutter's Container widget.

```tsx
<Container
  width="100%"
  height={200}
  padding={EdgeInsets.all(16)}
  margin={EdgeInsets.symmetric({ vertical: 8 })}
  backgroundColor="#f0f0f0"
  borderRadius={8}
  borderWidth={1}
  borderColor="#ddd"
>
  <span>Content goes here</span>
</Container>
```

#### Row & Column
Arrange children horizontally or vertically.

```tsx
<Row
  mainAxisAlignment={MainAxisAlignment.SPACE_BETWEEN}
  crossAxisAlignment={CrossAxisAlignment.CENTER}
>
  <span>Item 1</span>
  <span>Item 2</span>
  <span>Item 3</span>
</Row>

<Column
  mainAxisAlignment={MainAxisAlignment.CENTER}
  crossAxisAlignment={CrossAxisAlignment.START}
>
  <span>Item A</span>
  <span>Item B</span>
  <span>Item C</span>
</Column>
```

#### Flex
The base layout component that both Row and Column extend from.

```tsx
<Flex
  direction="row"
  mainAxisAlignment={MainAxisAlignment.CENTER}
  crossAxisAlignment={CrossAxisAlignment.STRETCH}
>
  <Container flex={1}>Flexible content</Container>
  <Container expanded>Expanded content</Container>
</Flex>
```

### Spacing Components

#### SizedBox
Create fixed-size spacing between elements.

```tsx
<SizedBox width={16} height={8} />
```

#### Spacer
Create flexible spacing that expands to fill available space.

```tsx
<Row>
  <span>Left</span>
  <Spacer />
  <span>Right</span>
</Row>
```

### Data Components

#### ListView
Efficiently render lists of data with Flutter's ListView patterns.

```tsx
<ListView
  items={data}
  itemBuilder={(item, index) => (
    <Container key={index} padding={EdgeInsets.all(8)}>
      <span>{item.name}</span>
    </Container>
  )}
  separatorBuilder={(index) => <SizedBox height={1} />}
/>
```

## 🎨 Design System

### EdgeInsets
Flutter's approach to padding and margins.

```tsx
// Uniform padding
EdgeInsets.all(16)

// Symmetric padding
EdgeInsets.symmetric({ horizontal: 16, vertical: 8 })

// Individual sides
EdgeInsets.only({ left: 8, top: 16, right: 8, bottom: 4 })

// Zero padding
EdgeInsets.zero()
```

### Alignment Enums

```tsx
// Main axis alignment (primary direction)
MainAxisAlignment.START
MainAxisAlignment.CENTER  
MainAxisAlignment.END
MainAxisAlignment.SPACE_BETWEEN
MainAxisAlignment.SPACE_AROUND
MainAxisAlignment.SPACE_EVENLY

// Cross axis alignment (perpendicular direction)
CrossAxisAlignment.START
CrossAxisAlignment.CENTER
CrossAxisAlignment.END  
CrossAxisAlignment.STRETCH
CrossAxisAlignment.BASELINE
```

## 🔧 Advanced Usage

### Responsive Design

```tsx
function ResponsiveLayout() {
  const [isDesktop, setIsDesktop] = useState(false)
  
  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024)
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])
  
  return (
    <Container width="100%">
      {isDesktop ? (
        <Row mainAxisAlignment={MainAxisAlignment.SPACE_BETWEEN}>
          <Container flex={1}>Sidebar</Container>
          <SizedBox width={24} />
          <Container flex={3}>Main Content</Container>
        </Row>
      ) : (
        <Column>
          <Container>Mobile Header</Container>
          <Container>Mobile Content</Container>
        </Column>
      )}
    </Container>
  )
}
```

### Flex Properties

```tsx
<Row>
  <Container flexible>Flexible (grows but can shrink)</Container>
  <Container expanded>Expanded (grows to fill space)</Container>
  <Container flex={2}>Custom flex factor</Container>
</Row>
```

## 📖 Concepts

This library follows Flutter's layout principles:

1. **Everything is a widget (component)**
2. **Composition over inheritance**  
3. **Explicit layout control**
4. **Predictable rendering**

### Flutter vs CSS Mapping

| Flutter Concept | CSS Equivalent | Flutter-React UI |
|----------------|----------------|------------------|
| Container | div with styles | `<Container>` |
| Row | flex-direction: row | `<Row>` |
| Column | flex-direction: column | `<Column>` |
| SizedBox | fixed width/height div | `<SizedBox>` |
| Spacer | flex: 1 | `<Spacer>` |
| EdgeInsets | padding/margin | `EdgeInsets.all()` |
| MainAxisAlignment | justify-content | `MainAxisAlignment.CENTER` |
| CrossAxisAlignment | align-items | `CrossAxisAlignment.START` |

## 🛠 Development

### Building the Library

```bash
# Install dependencies
bun install

# Build the library
bun run build

# Type checking
bun run type-check

# Linting
bun run lint
```

### Project Structure

```
src/
├── components/
│   ├── layout/          # Container, Row, Column, Flex
│   ├── spacing/         # SizedBox, Spacer
│   └── data/           # ListView
├── types/              # TypeScript definitions
└── index.ts           # Main exports
```

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our GitHub repository.

## 🔗 Links

- [GitHub Repository](https://github.com/charleskan/react-flutter-widgets)
- [Documentation](https://charleskan.github.io/react-flutter-widgets)
- [NPM Package](https://www.npmjs.com/package/react-flutter-widgets)

---

Built with ❤️ for the React community.