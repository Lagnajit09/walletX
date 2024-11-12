import React from "react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";

type Props = {};

const Example = (props: Props) => {
  return (
    <div className="container px-4 md:px-6">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
        How It Works
      </h2>
      <Tabs defaultValue="send" className="w-full max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="send">Send Money</TabsTrigger>
          <TabsTrigger value="receive">Receive Money</TabsTrigger>
        </TabsList>
        <TabsContent value="send">
          <Card>
            <CardHeader>
              <CardTitle>Send Money</CardTitle>
              <CardDescription>
                Send money to anyone, anywhere in the world.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" placeholder="$100" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Send Money</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="receive">
          <Card>
            <CardHeader>
              <CardTitle>Receive Money</CardTitle>
              <CardDescription>
                Receive money from anyone, anywhere in the world.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Your Email</Label>
                <Input id="email" placeholder="john@example.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Generate Payment Link</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Example;
