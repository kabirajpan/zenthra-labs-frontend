import { component$ } from "@builder.io/qwik";
import { IntroDoc, HelloWorldDoc } from "./GettingStartedDocs";
import {
    ArchOverviewDoc,
    ArchRenderDoc,
    ArchLayoutDoc,
    ArchStateDoc,
    ArchLazyDoc,
} from "./ArchitectureDocs";
import {
    ContainerDoc,
    LazyContainerDoc,
    PanelCardDoc,
    WindowDialogDoc,
    TitleBarDoc,
} from "./LayoutWidgetsDocs";
import {
    TextBtnDoc,
    ImageDoc,
    IndicatorsDoc,
} from "./ControlWidgetsDocs";
import {
    InputsDoc,
    SelectionDoc,
    MenusDoc,
} from "./SelectionWidgetsDocs";
import {
    CustomShadersDoc,
    CompositorBlurDoc,
} from "./AdvancedDocs";

interface DocContentProps {
    activeDoc: string;
}

export const DocContent = component$<DocContentProps>(({ activeDoc }) => {
    switch (activeDoc) {
        case "intro":
            return <IntroDoc />;
        case "hello-world":
            return <HelloWorldDoc />;
        case "arch-overview":
            return <ArchOverviewDoc />;
        case "arch-render":
            return <ArchRenderDoc />;
        case "arch-layout":
            return <ArchLayoutDoc />;
        case "arch-state":
            return <ArchStateDoc />;
        case "arch-lazy":
            return <ArchLazyDoc />;
        case "widget-container":
            return <ContainerDoc />;
        case "widget-lazy":
            return <LazyContainerDoc />;
        case "widget-panel-card":
            return <PanelCardDoc />;
        case "widget-window-dialog":
            return <WindowDialogDoc />;
        case "widget-title-bar":
            return <TitleBarDoc />;
        case "widget-text-btn":
            return <TextBtnDoc />;
        case "widget-image":
            return <ImageDoc />;
        case "widget-indicators":
            return <IndicatorsDoc />;
        case "widget-inputs":
            return <InputsDoc />;
        case "widget-selection":
            return <SelectionDoc />;
        case "widget-menus":
            return <MenusDoc />;
        case "custom-shaders":
            return <CustomShadersDoc />;
        case "compositor-blur":
            return <CompositorBlurDoc />;
        default:
            return <IntroDoc />;
    }
});
