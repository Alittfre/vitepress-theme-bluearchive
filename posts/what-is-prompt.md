---
title: AIGC时代，你还不知道Prompt？
date: 2024-05-29
tags: [Prompt, AI, ChatGPT, Stable Diffusion]
---

简单介绍 Prompt，并从应用角度阐述 Prompt 对 AI 生成结果的影响

---

## 什么是 Prompt？

Prompt 是生成式人工智能的一种指令技术，通过人类语言引导模型生成预期的结果。

无论是像 ChatGPT 这样的文字生成 AI，还是像 Stable Diffusion（以下简称 SD）这样的图像生成 AI，用户使用的第一步都是输入提示语或提示词，以引导 AI 生成他们期望的内容。这种用户输入的文字内容就可以被称为 Prompt。

## 什么是 Prompt 工程？

对于简单任务，一句仅包含预期结果的简单 Prompt 在大多数情况下足够使用。但当任务复杂化时，就需要提示词工程控制模型输出，使其生成更高质量、更具有准确性的结果。

这里将文字生成 （ChatGPT） 和 图像生成（SD）分开讨论，因为文字生成类 AI 的 Prompt 形式主要为完整的语句，而图像生成 AI 的 Prompt 形式主要为词语。

### 文字生成类 AI 的 Prompt 工程

在文字生成类 AI 中，Prompt 工程需要定义角色、任务和指令这三个主要元素：

- 角色：期望模型扮演的角色类型。
- 任务：描述期望生成的内容。
- 指令：指定生成结果的结构、方式。

这里举一个例子（基于 ChatGPT 3.5），假设用户现在需要使用 Python 进行数据处理。

> 用户输入：你是熟悉 python 数据处理的程序员，你熟悉相关模块如 pandas、numpy、seaborn、matplotlib 的使用，请完成我的一些需求。
>
> ---
>
> 模型输出：当然，请告诉我你的需求，我会尽力帮助你完成。

---

> 用户输入：现在我要进行餐饮信息表分析，我已经读取了数据，输出部分数据样例如下，第一行是数据项，第二行是数据项对应的数据：
> 城市 类型 店名 点评 人均 口味 环境 服务
> 南宁 面包甜点 茶道夫(北湖店) 3.0 10.0 7.3 7.3 7.3
>
> 请你知悉以上信息，接下来我将提出一些需求，注意你只要给出关键代码。
>
> ---
>
> 模型输出：好的，请告诉我你具体的需求，我会为你提供相应的代码。

---

> 用户输入：现在按类型聚合餐饮店数量并画出水平柱形图
> 要求：
>
> - 图标题为“不同类型餐饮店数量对比”
> - 添加 x 轴和 y 轴标签
> - 添加网格
>
> ---
>
> 模型输出：
> 好的，下面是实现你需求的关键代码：
>
> ```python
> import pandas as pd
> import matplotlib.pyplot as plt
>
> # 示例数据
> data = {
>    '城市': ['南宁'],
>    '类型': ['面包甜点'],
>    '店名': ['茶道夫(北湖店)'],
>    '点评': [3.0],
>    '人均': [10.0],
>    '口味': [7.3],
>    '环境': [7.3],
>    '服务': [7.3]
> }
>
> # 创建DataFrame
> df = pd.DataFrame(data)
>
> # 按类型聚合餐饮店数量
> type_counts = df['类型'].value_counts()
>
> # 画水平柱形图
> plt.figure(figsize=(10, 6))
> type_counts.plot(kind='barh')
>
> # 添加标题和轴标签
> plt.title('不同类型餐饮店数量对比')
> plt.xlabel('餐饮店数量')
> plt.ylabel('餐饮店类型')
>
> # 添加网格
> plt.grid(axis='x')
>
> # 显示图表
> plt.show()
> ```
>
> 此代码首先创建了一个示例 DataFrame，随后按餐饮店类型聚合数量，并使用 `matplotlib` 画出水平柱形图。最后添加了图标题、x 轴和 y 轴标签以及网格。根据你的实际数据，创建 DataFrame 的部分应该替换为你实际的读取数据的代码。

以上 3 段对话中就包含了一个简单的提示词工程，其中角色为`熟悉 python 数据处理的程序员`，任务为`按类型聚合餐饮店数量并画出水平柱形图`，指令为`接下来我将提出一些需求，注意你只要给出关键代码`。

### 图像生成类 AI 的 Prompt 工程

在图像生成类 AI 中，由于 Prompt 的形式主要为独立的词语，所以没有明显的作用划分。这里我个人给出了三个分类，分别为质量控制类、主体描述类和细节描述类。

- 质量控制类：控制模型生成图片质量，如`masterpiece, best quality`。
- 主体描述类：描述图片的内容主体，如`1girl`。
- 细节描述类：描述图片主体内外的细节，如`purple-pink eyes, pink hair`。

这里同样举一个例子（基于 SD WebUI Forge 和 Animagine-xl-3.1 模型），假设用户现在需要生成一个在咖啡馆的女孩。

正面 Prompt：

> masterpiece, best quality, very aesthetic, absurdres, 1girl,winter clothes,light theme clothes,sweater,scarf,pink hair,short hair,purple-pink eyes,ahoge,(light smile:0.7),light blush,head rest\\( one hand \\),head tilt,upper body,looking at viewer, sitting, close-up,indoors,coffee cup,classical coffee shop,window,soft sunlight,winter, day ,blurry background,(watercolor pencil (medium):1.2)

负面 Prompt：

> nsfw, lowres, (bad), text, error, fewer, extra, missing, worst quality, jpeg artifacts, low quality, watermark, unfinished, displeasing, oldest, early, chromatic aberration, signature, extra digits, artistic error, username, scan, [abstract],from side

输出图片：

以上的 Prompt 中有

- 质量控制类：`masterpiece, best quality, very aesthetic, absurdres`
- 主体描述类：`1girl,winter clothes,light theme clothes,sweater,scarf`
- 细节描述类：`(light smile:0.7),light blush,head rest\( one hand \),head tilt`

需要说明的是图片生成 AI 的控制维度不只有 Prompt，还有采样方法，CLIP 层数等。此外不同模型的差异也会影响结果，碍于篇幅问题这里不做展开。

## 对比与分析

现在假设一个对人工智能不了解的用户想要知道什么是 LLM，以下是不同 Prompt 输出的结果对比。

> 用户输入：解释一下什么是 LLM
>
> ---
>
> 模型输出：LLM 是大型语言模型（Large Language Model）的缩写。大型语言模型是一种通过机器学习技术训练的自然语言处理模型，通常基于大量的文本数据。它们用于理解和生成人类语言，能够执行各种语言任务，如文本生成、翻译、总结、回答问题等。以下是一些关键点：
>
> 1.  **基础技术**：LLM 通常基于深度学习，特别是基于 Transformer 架构。这种架构能够有效地处理和生成自然语言，广泛应用于诸如 GPT（Generative Pre-trained Transformer）系列模型中。
>
> 2.  **训练数据**：LLM 是通过大量的文本数据进行训练的，这些数据可以来自书籍、文章、网站和其他形式的文本。通过学习这些数据，模型能够掌握语言的结构、语法以及上下文关系。
>
> 3.  **应用场景**：LLM 被广泛应用于多个领域，包括但不限于：
>
> - **聊天机器人**：如智能助手和客户服务系统。
> - **内容生成**：自动生成文章、报告、代码等。
> - **翻译**：多语言翻译系统。
> - **信息检索**：提高搜索引擎的智能化程度。
> - **文本分析**：情感分析、主题检测等。
>
> 4.  **优势与挑战**：
>
> - **优势**：LLM 具有强大的语言理解和生成能力，可以处理复杂的语言任务，并不断改进其性能。
> - **挑战**：LLM 需要大量的计算资源进行训练和推理，可能存在偏见和不准确性，需要在使用时进行仔细的监控和调整。
>
> 5.  **发展趋势**：随着技术的发展，LLM 的规模和能力不断提升，新版本的模型（如 GPT-4）在理解和生成语言方面表现得越来越接近人类水平，同时也在努力减少训练和使用过程中的资源消耗。
>
> 总的来说，大型语言模型是自然语言处理领域的一个重要工具，推动了许多应用的智能化和自动化。

---

> 用户输入：你是熟悉人工智能的专家，现在你准备向一位对人工智能感兴趣的普通人解释什么是 LLM，请尽量使用通俗易懂的方式解释说明什么是 LLM。
>
> ---
>
> 模型输出：当然！让我们来解释一下什么是“大语言模型”（Large Language Model，简称 LLM）。
>
> 想象一下，你有一个超级聪明的机器人朋友，它非常擅长理解和生成各种各样的文本。这种机器人朋友可以帮你写文章、回答问题、甚至讲故事。这就是大语言模型的基本功能。
>
> 具体来说，大语言模型是一种由人工智能驱动的工具，它经过大量的文本训练，比如书籍、文章、网页等。通过学习这些文本，模型能够理解语言的结构和内容。当你向它提问或让它写东西时，它会根据自己学到的知识生成合理的答案或内容。
>
> ### 举个例子
>
> 假如你问大语言模型：“什么是猫？” 它可能会回答你：“猫是一种小型哺乳动物，通常作为宠物饲养。它们有尖锐的爪子和灵活的身体，喜欢捉老鼠和玩耍。”
>
> ### 关键点
>
> 1.  **学习大量文本**：大语言模型通过阅读海量的文本数据来学习语言。这就像我们通过读书学习知识一样。
> 2.  **理解和生成文本**：它能理解你的问题，并生成看起来很自然、很合理的回答。
> 3.  **应用广泛**：大语言模型可以用在很多地方，比如聊天机器人、翻译工具、写作助手等等。
>
> ### 日常生活中的应用
>
> - **聊天机器人**：像客服聊天机器人，它们可以回答你的各种问题，比如产品信息、订购情况等。
> - **写作助手**：帮你写文章、邮件或是创作故事。
> - **翻译工具**：可以帮你把一种语言翻译成另一种语言。
>
> 总之，大语言模型就像一个超级智能的语言助手，它通过学习大量的文本，能够理解并生成语言，从而帮助我们完成各种语言相关的任务。

可以看到两份回答截然不同，第一份回答更偏向专业性，有一下专业术语。而第二份回答更加通俗易懂，且无专业术语。

---

接下来看看 SD 的案例，目标为生成一张主体为林中女孩的图片。

正面 Prompt：

> 1girl, looking at viewer, cowboy shot,white dress,wind,light smile, day, outdoors,soft sunlight, leaf, tree,blurry background

无负面 Prompt

输出图片：

---

正面 Prompt：

> masterpiece, best quality, very aesthetic, absurdres,1girl, looking at viewer, cowboy shot,white dress,wind,light smile, day, outdoors,soft sunlight, leaf, tree,blurry background

负面 Prompt：

> nsfw, lowres, (bad), text, error, fewer, extra, missing, worst quality, jpeg artifacts, low quality, watermark, unfinished, displeasing, oldest, early, chromatic aberration, signature, extra digits, artistic error, username, scan, [abstract]

输出图片：

> ![tree and girl complex prompt](/wallpaper-878514.jpg)

以上结果其实我有些意外，我个人更喜欢第一张，但论画面的精细程度还是第二张略胜一筹。这其实也体现了图像生成类 AI 的 Prompt 不是控制图像效果的唯一维度，其更加复杂。（~~其实这里造成差异的原因是 Animagine-xl-3.1 的`masterpiece, best quality`标签在训练中的数据集大多来源于本子，所以略显油腻，也是负面 Prompt 为什么要加入`nsfw`的原因~~）

Prompt 工程也不是一蹴而就的，而是渐进式优化的，才能更加贴近用户的需求。

#### 参考资料

[Prompt 工程指南](https://www.xfyun.cn/doc/spark/Prompt%E5%B7%A5%E7%A8%8B%E6%8C%87%E5%8D%97.html)
